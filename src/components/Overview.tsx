import { useContext, useEffect, useMemo, useState } from 'react';
import { CardContent, Typography } from '@mui/material';
import styled from 'styled-components';

import { fetchCompanyOverview } from 'data';
import { CompanyOverview } from 'data/types';
import { OVERVIEW_FIELDS } from 'lib/constants';
import { formatFiancialValue, formatInfoTitle } from 'lib/common';

import { StockContext } from 'contexts/StockContext';
import { Card, Divider, OverviewLoaderSkeleton } from 'components/common';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-bottom: 1rem;
  p {
    font-size: 0.8rem;
    color: #666;
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
  grid-template-columns: 1fr 1.5fr;
  grid-gap: 0.5rem;
`;

function Financials() {
  const { activeData } = useContext(StockContext);

  const [overview, setOverview] = useState<CompanyOverview>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const { financials, company } = useMemo(() => {
    const overviewItems = overview ? Object.keys(overview) : [];
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
    if (activeData) {
      fetchCompanyOverview(activeData.symbol).then(
        ({ success, message, result }) => {
          if (!success || !result) {
            setError(message);
          }
          setOverview(result);
          setLoading(false);
        }
      );
    }
  }, [activeData]);

  if (loading) {
    return (
      <Container>
        <Card title="Company Overview">
          <OverviewLoaderSkeleton />
        </Card>
      </Container>
    );
  }

  if (error || !overview) {
    return (
      <Container>
        <Card title="Company Overview">
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
      <Card title="Company">
        <CardContent>{<p>{overview.Description}</p>}</CardContent>
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

      <Card title="Financials">
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
