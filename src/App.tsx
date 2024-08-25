import React from 'react';
import { Page } from './components/Page';
import { Container } from './components/Container';
import { Grid } from './components/Grid';
import { ScrollArea } from './components/ScrollContainer';
import { Card } from './components/Card';
import { Section } from './components/Section';
import { Text } from './components/Text';
import { useQuery } from 'react-query';

interface Problem {
  id: number;
  title: string;
  answerRate: number;
  level: number;
}

const fetchProblems = async (): Promise<Problem[]> => {
  const response = await fetch('http://assignment.mathflat.com/problems');
  if (!response.ok) {
    throw new Error('문제를 불러오는 데 실패했습니다.');
  }
  return response.json();
};

export const useProblems = () => {
  return useQuery<Problem[]>('problems', fetchProblems, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

const App = () => {
  const { data: problems, isLoading, error } = useProblems();

  if (isLoading) return <div>문제를 불러오는 중...</div>;
  if (error) return <div>문제를 불러오는 데 오류가 발생했습니다.</div>;

  return (
    <Page>
      <Section vertical='14'>
        <Container fullHeight>
          <Grid columns={12} gap="16px">
            <Grid.Item colSpan={5}>
              <div style={{ padding: '16px', textAlign: 'center', color: '#666', backgroundColor: '#f8f9fa', height: '100%', borderRadius: '8px' }}>
                유사문제를 추가 또는 교체할 수 있습니다.
              </div>
            </Grid.Item>
            <Grid.Item colSpan={7}>
              <ScrollArea height="900px">
                {problems && problems.map((problem: Problem, index: number) => (
                  <Card key={problem.id}>
                    <Text typography="heading.s" color="#333">
                      {index + 1}. {problem.title}
                    </Text>
                    <Text typography="body.m" color="#666">
                      정답률: {problem.answerRate}%
                    </Text>
                  </Card>
                ))}

                {problems && (
                  <div style={{ padding: '16px', textAlign: 'center', color: '#666' }}>
                    하: {problems.filter((p: Problem) => p.level === 1).length} · 중하: {problems.filter((p: Problem) => p.level === 2).length} · 중: {problems.filter((p: Problem) => p.level === 3).length} · 상: {problems.filter((p: Problem) => p.level === 4).length} · 최상: {problems.filter((p: Problem) => p.level === 5).length} | 문제 수 {problems.length} 개
                  </div>
                )}
              </ScrollArea>
            </Grid.Item>
          </Grid>
        </Container>
      </Section>
    </Page>
  );
};

export default App;
