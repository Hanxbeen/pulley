import React, { useState, useEffect } from 'react';
import Grid from 'components/Grid';
import ScrollContainer from 'components/ScrollContainer';
import IconButton from 'components/IconButton';
import Card from 'components/Card';
import Text from 'components/Text';
import Badge from 'components/Badge';
import LevelBadge from 'components/LevelBadge';
import Img from 'components/Img';
import Stack from 'components/Stack';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';

interface Problem {
  id: number;
  title: string;
  answerRate: number;
  level: 1 | 2 | 3 | 4 | 5;
  problemImageUrl: string;
  type: number;
}

const fetchProblems = async (): Promise<Problem[]> => {
  const response = await fetch('http://assignment.mathflat.com/problems');
  if (!response.ok) {
    throw new Error('문제를 불러오는 데 실패했습니다.');
  }
  return response.json();
};

const fetchSimilarProblems = async (problemId: number, excludedProblemIds: number[]): Promise<Problem[]> => {
  const excludedIds = excludedProblemIds.join(',');
  const response = await fetch(`http://assignment.mathflat.com/problems/${problemId}/similarity?excludedProblemIds=${excludedIds}`);
  if (!response.ok) {
    throw new Error('유사 문제를 불러오는 데 실패했습니다.');
  }
  return response.json();
};

export const useProblems = () => {
  return useQuery<Problem[]>('problems', fetchProblems, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #e8e8e8;
  height: 100%;
  border-radius: 12px;
`;

const InfoBoxEmptyState = styled.div`
  text-align: center;
`;

const ButtonGroup = styled.div`
  min-width: 110px;
  display: flex;
`;

const StudyDetail = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 17px 16px 0 16px;
  border-radius: 12px;
`;

const Summary = styled.div`
  padding: 20px 4px;
  text-align: right;
`;

const ProblemImg = styled(Img)`
  max-width: 400px;
  height: fit-content;
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;  
  justify-content: center;
  padding-right: 16px;
  padding-left: 28px;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.onSurface};
`;

const ProblemManager: React.FC = () => {
  const { data: problems, isLoading, error } = useProblems();
  const [studyDetailProblems, setStudyDetailProblems] = useState<Problem[]>([]);
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null);
  const [similarProblems, setSimilarProblems] = useState<Problem[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (problems) {
      setStudyDetailProblems(problems);
    }
  }, [problems]);

  const handleSimilarProblemsClick = (problemId: number) => {
    if (!studyDetailProblems) return;

    const excludedProblemIds = studyDetailProblems.map(problem => problem.id);
    fetchSimilarProblems(problemId, excludedProblemIds)
      .then(fetchedSimilarProblems => {
        queryClient.setQueryData(['similarProblems', problemId], fetchedSimilarProblems);
        setSimilarProblems(fetchedSimilarProblems);
        setSelectedProblemId(problemId);
      })
      .catch(error => {
        console.error('유사 문제를 불러오는 중 오류 발생:', error);
      });
  };

  const handleAddProblem = (newProblem: Problem) => {
    if (selectedProblemId !== null) {
      const selectedIndex = studyDetailProblems.findIndex(p => p.id === selectedProblemId);
      const updatedProblems = [
        ...studyDetailProblems.slice(0, selectedIndex),
        newProblem,
        ...studyDetailProblems.slice(selectedIndex)
      ];
      setStudyDetailProblems(updatedProblems);
      setSimilarProblems(similarProblems.filter(p => p.id !== newProblem.id));
    }
  };

  const handleReplaceProblem = (replacementProblem: Problem) => {
    if (selectedProblemId !== null) {
      const updatedProblems = studyDetailProblems.map(p =>
        p.id === selectedProblemId ? replacementProblem : p
      );
      setStudyDetailProblems(updatedProblems);
      setSimilarProblems(similarProblems.filter(p => p.id !== replacementProblem.id));
      setSelectedProblemId(replacementProblem.id); 

      handleSimilarProblemsClick(replacementProblem.id);
    }
  };

  const handleDeleteProblemFromList = (problemId: number, listType: 'studyDetail' | 'similar') => {
    if (listType === 'studyDetail') {
      const updatedProblems = studyDetailProblems.filter(p => p.id !== problemId);
      setStudyDetailProblems(updatedProblems);
      if (selectedProblemId === problemId) {
        setSelectedProblemId(null);
        setSimilarProblems([]);
      }
    } else if (listType === 'similar') {
      const updatedSimilarProblems = similarProblems.filter(p => p.id !== problemId);
      setSimilarProblems(updatedSimilarProblems);
    }
  };

  if (isLoading) return <div>문제를 불러오는 중...</div>;
  if (error) return <div>문제를 불러오는 데 오류가 발생했습니다.</div>;

  return (
    <Grid gap="16px">
      <Grid.Unit ratio={{ desktop: 1 / 2, largeDesktop: 5 / 12 }}>
        <InfoBox>
          {similarProblems.length > 0
            ? (
              <Stack vertical gap="16px">
                <Text
                  typography="body1"
                  color="black"
                  weight='bold'
                >
                  유사 문항
                </Text>
                <ScrollContainer height="900px">
                  <Stack vertical gap="16px">
                    {similarProblems.map((problem, index) => (
                      <Card
                        key={problem.id}
                        renderHeader={() => (
                          <CardHeaderWrapper>
                            <Stack distribution="space-between" gap="16px">
                              <Stack gap="32px" alignment='center'>
                                <Text
                                  typography='h4'
                                  color='black'
                                  weight='semiBold'
                                >
                                  {index + 1}
                                </Text>
                                <Text
                                  typography='body2'
                                  color='black'
                                >
                                  {problem.title}
                                </Text>
                              </Stack>
                              <ButtonGroup>
                                <Stack gap="12px">
                                  <IconButton
                                    variant="plain"
                                    color="lightGray"
                                    hoverColor="primary"
                                    name='swap-horiz'
                                    onClick={() => handleReplaceProblem(problem)}
                                  >
                                    교체
                                  </IconButton>
                                  <IconButton
                                    variant="plain"
                                    color="lightGray"
                                    hoverColor="alert"
                                    name="delete"
                                    onClick={() => handleDeleteProblemFromList(problem.id, 'similar')}
                                  >
                                    삭제
                                  </IconButton>
                                </Stack>
                              </ButtonGroup>
                            </Stack>
                          </CardHeaderWrapper>
                        )}
                        renderBody={() => (
                          <Stack gap="16px">
                            <Stack gap="8px" vertical>
                              <LevelBadge level={problem.level} />
                              <Badge>
                                <Text typography='caption1' color="gray">
                                  {`${problem.answerRate}%`}
                                </Text>
                              </Badge>
                              <Badge>
                                <Text typography='caption1' color="lightGray">
                                  {problem.type === 1 ? "객관식" : "주관식"}
                                </Text>
                              </Badge>
                            </Stack>
                            {problem.problemImageUrl && (
                              <ProblemImg
                                src={problem.problemImageUrl}
                                alt={problem.title}
                              />
                            )}
                          </Stack>
                        )}
                      />
                    ))}
                  </Stack>
                </ScrollContainer>
              </Stack>
            )
            : (
              <InfoBoxEmptyState>
                <Stack vertical gap="8px" alignment="center" distribution="center">
                  <Stack gap="6px" alignment='center'>
                    <IconButton
                      readOnly
                      size="s"
                      color="white"
                      name='add-circle'
                    >
                      유사 문제
                    </IconButton>
                    <Text typography="body2">
                      버튼을 누르면
                    </Text>
                  </Stack>
                  <Text typography="body2">
                    문제를 추가 또는 교체할 수 있습니다.
                  </Text>
                </Stack>
              </InfoBoxEmptyState>
            )
          }
        </InfoBox>
      </Grid.Unit>
      <Grid.Unit ratio={{ desktop: 1 / 2, largeDesktop: 7 / 12 }}>
        <StudyDetail>
          <Stack vertical gap="16px">
            <Text
              typography="body1"
              color="white"
              weight='bold'
            >
              학습지 상세 편집
            </Text>
            <ScrollContainer height="836px">
              <Stack vertical gap="16px">
                {studyDetailProblems.map((problem: Problem, index: number) => (
                  <Card
                    key={problem.id}
                    active={selectedProblemId === problem.id}
                    renderHeader={() => (
                      <CardHeaderWrapper>
                        <Stack distribution="space-between">
                          <Stack gap="32px" alignment='center'>
                            <Text
                              typography='h4'
                              color='black'
                              weight='semiBold'
                            >
                              {index + 1}
                            </Text>
                            <Text
                              typography='body2'
                              color='black'
                            >
                              {problem.title}
                            </Text>
                          </Stack>
                          <ButtonGroup>
                            <Stack gap="12px">
                              <IconButton
                                variant="plain"
                                color="lightGray"
                                hoverColor="primary"
                                name='add-circle'
                                onClick={() => handleSimilarProblemsClick(problem.id)}
                              >
                                유사 문제
                              </IconButton>
                              <IconButton
                                variant="plain"
                                color="lightGray"
                                hoverColor="alert"
                                name="delete"
                                onClick={() => handleDeleteProblemFromList(problem.id, 'studyDetail')}
                              >
                                삭제
                              </IconButton>
                            </Stack>
                          </ButtonGroup>
                        </Stack>
                      </CardHeaderWrapper>
                    )}
                    renderBody={() => (
                      <Stack gap="16px">
                        <Stack gap="8px" vertical>
                          <LevelBadge level={problem.level} />
                          <Badge>
                            <Text typography='caption1' color="gray">
                              {`${problem.answerRate}%`}
                            </Text>
                          </Badge>
                          <Badge>
                            <Text typography='caption1' color="lightGray">
                              {problem.type === 1 ? "객관식" : "주관식"}
                            </Text>
                          </Badge>
                        </Stack>
                        {problem.problemImageUrl && (
                          <ProblemImg
                            src={problem.problemImageUrl}
                            alt={problem.title}
                          />
                        )}
                      </Stack>
                    )}
                  />
                ))}
              </Stack>
            </ScrollContainer>
          </Stack>
          <Summary>
            {studyDetailProblems.length > 0 ? (
              <>
                <Text typography="body1" color="gray" inline>
                  하: {studyDetailProblems.filter((p: Problem) => p.level === 1).length} ·
                  중하: {studyDetailProblems.filter((p: Problem) => p.level === 2).length} ·
                  중: {studyDetailProblems.filter((p: Problem) => p.level === 3).length} ·
                  상: {studyDetailProblems.filter((p: Problem) => p.level === 4).length} ·
                  최상: {studyDetailProblems.filter((p: Problem) => p.level === 5).length}
                </Text>
                <Text typography="body1" color="gray" inline>
                  {" | "}
                </Text>
                <Text typography="body1" weight="bold" color="white" inline>
                  문제 수 {studyDetailProblems.length} 개
                </Text>
              </>
            ) : (
              <Text typography="body1" weight="bold" color="alert">
                문제 수 0 개
              </Text>
            )}
          </Summary>
        </StudyDetail>
      </Grid.Unit>
    </Grid>
  );
};

export default ProblemManager;
