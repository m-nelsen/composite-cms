import { FC, useContext } from "react";
import {
  CompositeContext,
  CompositeContextType,
} from "../../context/composite";

const StoryBody: FC = () => {
  const { globalContent = {} } =
    useContext<CompositeContextType>(CompositeContext);

  if (!globalContent) {
    return null;
  }

  const { title, author, dateCreated, body = [] } = globalContent;

  return (
    <div className="story-body">
      {title && <h1>{title}</h1>}
      {author && <p>{author}</p>}
      {dateCreated && <p>{new Date(dateCreated).toString()}</p>}
      {body &&
        !!body.length &&
        body.map((element: { _id: string; content: string }) => {
          return <p key={element._id}>{element.content}</p>;
        })}
    </div>
  );
};

export default StoryBody;
