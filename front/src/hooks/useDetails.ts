import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../services/rickAndMortyGraphql";
import { createComment, getComments } from "../services/comments";

const COMMENT_INITIAL_VALUE = "";

export function useDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [comment, setComment] = useState(COMMENT_INITIAL_VALUE);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCharacterById(Number(id)).then((data) => {
      setCharacter(data);
    });
  }, [id]);

  useEffect(() => {
    getComments(Number(id)).then((data) => {
      setComments(data);
    });
  }, [id]);

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    if (!comment || comment === "") return;

    createComment({ id: Number(id), comment }).then((data) => {
      setComment(COMMENT_INITIAL_VALUE);
      setComments(data);
    });
  };

  return {
    character,
    comment,
    comments,
    handleChangeComment,
    handleSubmitComment,
  };
}
