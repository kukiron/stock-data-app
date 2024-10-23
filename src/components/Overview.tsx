import keys from 'lodash/keys';
import { useContext, useEffect, useMemo, useState } from 'react';
import { CardContent, Typography } from '@mui/material';
import FinancialsIcon from '@mui/icons-material/AccountBalance';
import CompanyIcon from '@mui/icons-material/Business';
import styled from 'styled-components';

import { fetchCompanyOverview } from 'data/api';
import { gray80 } from 'lib/colors';
import { OVERVIEW_FIELDS } from 'lib/constants';
import { formatFiancialValue, formatInfoTitle } from 'lib/common';
import type { CompanyOverview } from 'data/types';

import { StockContext } from 'contexts/StockContext';
import { Card, Divider, OverviewLoaderSkeleton } from 'components/common';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 0.8rem;
    color: ${gray80};
  }
`;

const ItemWrapper = styled.div`
  &:last-child {
    ${Divider} {
      display: none;
    }
  }
`;

const GridWrapper = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1.25fr 1.5fr;
  grid-gap: 1rem;
  padding: 0 1rem;
`;

function Financials() {
  const {
    demo,
    appState: { activeData },
  } = useContext(StockContext);

  const [overview, setOverview] = useState<CompanyOverview>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const { financials, company } = useMemo(() => {
    const overviewItems = overview ? keys(overview) : [];
    return overviewItems.reduce<{ financials: string[]; company: string[] }>(
      (acc, item) => {
        switch (true) {
          case OVERVIEW_FIELDS.financials.includes(item):
            return { ...acc, financials: [...acc.financials, item] };
          case OVERVIEW_FIELDS.company.includes(item):
            return { ...acc, company: [...acc.company, item] };
          default:
            return acc;
        }
      },
      { financials: [], company: [] }
    );
  }, [overview]);

  useEffect(() => {
    const input = !demo ? activeData?.symbol : undefined;
    // fetch data if running the app with demo endpoints
    // or after a successful search, which will set/change the `activeData`
    if (demo || activeData) {
      fetchCompanyOverview(input).then(({ success, message, result }) => {
        if (!success || !result) {
          setError(message);
        }
        setOverview(result);
        setLoading(false);
      });
    }
  }, [demo, activeData]);

  if (loading) {
    return (
      <Container>
        <Card title="Company Overview" Icon={CompanyIcon}>
          <OverviewLoaderSkeleton />
        </Card>
      </Container>
    );
  }

  if (error || !overview) {
    return (
      <Container>
        <Card title="Company Overview" Icon={CompanyIcon}>
          <Typography
            align="center"
            variant="subtitle1"
            color="red"
            sx={{ p: 3 }}
          >
            {error}
          </Typography>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card title="Company" Icon={CompanyIcon}>
        <CardContent sx={{ lineHeight: 1.5 }}>
          {<p>{overview.Description}</p>}
        </CardContent>
        <Divider />
        <CardContent>
          {company.map((key) => {
            const value = overview[key as keyof CompanyOverview];
            return (
              <ItemWrapper key={key}>
                <GridWrapper>
                  <p style={{ letterSpacing: '0.75px' }}>
                    {formatInfoTitle(key).toUpperCase()}
                  </p>
                  <p>
                    <b>
                      {key === 'OfficialSite' ? (
                        <a href={value} target="_blank" rel="noreferrer">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </b>
                  </p>
                </GridWrapper>

                <Divider />
              </ItemWrapper>
            );
          })}
        </CardContent>
      </Card>

      <Card title="Financials" Icon={FinancialsIcon}>
        <CardContent>
          {financials.map((key) => {
            const value = overview[key as keyof CompanyOverview];
            return (
              <ItemWrapper key={key}>
                <GridWrapper key={key}>
                  <p style={{ letterSpacing: '0.75px' }}>
                    {formatInfoTitle(key).toUpperCase()}
                  </p>
                  <p>
                    <b>{formatFiancialValue(key, value)}</b>
                  </p>
                </GridWrapper>

                <Divider />
              </ItemWrapper>
            );
          })}
        </CardContent>
      </Card>
    </Container>
  );
}

export default Financials;
