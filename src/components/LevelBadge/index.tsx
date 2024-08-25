import React from 'react';
import Badge from 'components/Badge';
import Text from 'components/Text';

interface LevelBadgeProps {
  level: 1 | 2 | 3 | 4 | 5;
}

const getLevelColor = (level: number) => {
  switch (level) {
    case 1:
    case 2:
      return "alert";
    case 3:
      return "positive";
    case 4:
      return "primary";
    case 5:
      return "secondary";
    default:
      return "gray";
  }
};

const getLevelText = (level: number) => {
  switch (level) {
    case 1:
      return '최상';
    case 2:
      return '상';
    case 3:
      return '중';
    case 4:
      return '중하';
    case 5:
      return '하';
    default:
      return '';
  }
};

const LevelBadge = ({ level }: LevelBadgeProps) => {
  return (
    <Badge>
      <Text
        typography='caption1'
        color={getLevelColor(level)}
      >
        {getLevelText(level)}
      </Text>
    </Badge>
  );
};

export default LevelBadge;
