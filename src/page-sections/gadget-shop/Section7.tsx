import { FC } from 'react';
import Grid from '@component/grid/Grid';
import CategorySectionCreator from '@component/CategorySectionCreator';
import Blog from '@models/blog.model';
import { Card3 } from './showcase-cards';

// ================================================
type Props = { blogs: Blog[] };
// ================================================

const Section7: FC<Props> = ({ blogs }) => (
  <CategorySectionCreator>
    <Grid container spacing={6}>
      {blogs.map((item) => (
        <Grid item md={6} xs={12} key={item.id}>
          <Card3
            title={item.title}
            date={item.createdAt}
            imgUrl={item.thumbnail}
            commentCount={item.comments}
            description={item.description}
          />
        </Grid>
      ))}
    </Grid>
  </CategorySectionCreator>
);

export default Section7;
