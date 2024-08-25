import React from 'react';
import { Page } from 'components/Page';
import { Section } from 'components/Section';
import { Container } from 'components/Container';
import ProblemManager from 'components/ProblemManager';

const App = () => {
  return (
    <Page>
      <Section vertical="14">
        <Container>
          <ProblemManager />
        </Container>
      </Section>
    </Page>
  );
};

export default App;
