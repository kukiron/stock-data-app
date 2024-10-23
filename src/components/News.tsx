import { useContext, useEffect, useState } from 'react';
import { CardContent, Typography } from '@mui/material';
import NewsIcon from '@mui/icons-material/Newspaper';
import styled from 'styled-components';

import { fetchLatestNews } from 'data/api';
import type { NewsFeed } from 'data/types';
import { getPublishedTime } from 'lib/date';
import { formatNewsResponse } from 'lib/common';
import { gray20, gray50, gray70 } from 'lib/colors';

import { StockContext } from 'contexts/StockContext';
import { Card, Divider, NewsLoaderSkeleton } from './common';

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  cursor: pointer;
  transition: background 200ms ease-in-out;

  &:hover {
    background: ${gray20};
  }

  &:last-child {
    ${Divider} {
      display: none;
    }
  }
`;

const TextWrapper = styled.div`
  padding-bottom: 1rem;
  p {
    font-size: 0.8rem;
    color: ${gray70};
  }

  div {
    font-size: 0.9rem;
  }
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  border-radius: 5px;
  margin-right: 1.5rem;
`;

const Separator = styled.div`
  width: 2px;
  height: 0.75rem;
  margin: 0 1rem;
  background-color: ${gray50};
`;

function News() {
  const {
    demo,
    appState: { activeData },
  } = useContext(StockContext);

  const [newsFeed, setNewsFeed] = useState<NewsFeed[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const input = !demo ? activeData?.symbol : undefined;
    // fetch data if running the app with demo endpoints
    // or after a successful search, which will set/change the `activeData`
    if (demo || activeData) {
      fetchLatestNews(input).then(({ success, message, result }) => {
        if (!success || !result) {
          setError(message);
        }
        setNewsFeed(formatNewsResponse(result));
        setLoading(false);
      });
    }
  }, [demo, activeData]);

  const renderContent = () => {
    // render skeleton loader
    if (loading) {
      return <NewsLoaderSkeleton />;
    }

    if (error || !newsFeed.length) {
      return (
        <Typography
          align="center"
          variant="subtitle1"
          color="red"
          sx={{ p: 3 }}
        >
          {error}
        </Typography>
      );
    }

    return (
      <CardContent>
        {newsFeed.map(
          ({ title, source, time_published, banner_image, url }) => (
            <Wrapper
              key={time_published}
              onClick={() => window.open(url, '_blank')}
            >
              <FlexWrapper>
                <Image src={banner_image} alt={source} />

                <TextWrapper key={time_published}>
                  <FlexWrapper>
                    <p>
                      <b>{source}</b>
                    </p>
                    <Separator />
                    <p>{getPublishedTime(time_published)}</p>
                  </FlexWrapper>
                  <div>{title}</div>
                </TextWrapper>
              </FlexWrapper>

              <Divider />
            </Wrapper>
          )
        )}
      </CardContent>
    );
  };

  return (
    <Card title="In the News" Icon={NewsIcon}>
      {renderContent()}
    </Card>
  );
}

export default News;
