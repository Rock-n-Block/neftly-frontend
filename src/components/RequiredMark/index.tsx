import React from 'react';
import { Text } from 'components';

const requiredMark: React.FC = () => {
  return (
    <Text color="red" tag="span">
      *
    </Text>
  );
};
export default requiredMark;
