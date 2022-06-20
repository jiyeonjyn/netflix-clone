import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

const Container = styled(motion.form)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transform-origin: right;
  padding: 5px 10px;
`;

const Svg = styled.svg`
  cursor: pointer;
`;

const Input = styled(motion.input)`
  padding: 0;
  background-color: ${(props) => props.theme.black[0]};
  color: ${(props) => props.theme.white[0]};
  font-size: 16px;
`;

const containerVariants = {
  inactive: {
    border: '1px solid rgba(255, 255, 255, 0)',
    backgroundColor: 'rgba(20, 20, 20, 0)',
  },
  active: {
    border: '1px solid rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(20, 20, 20, 1)',
    transition: {
      duration: 0.1,
    },
  },
};

const inputVariants = {
  inactive: {
    width: '0px',
    paddingLeft: '0px',
    backgroundColor: 'rgba(20, 20, 20, 0)',
  },
  active: {
    width: '220px',
    paddingLeft: '15px',
    backgroundColor: 'rgba(20, 20, 20, 1)',
    transition: {
      type: 'tween',
      duration: 0.3,
    },
  },
};

interface SearchForm {
  query: string;
}

const SearchBox = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const [isActive, setIsActive] = useState(false);
  const toggleIsActive = () => setIsActive((prev) => !prev);

  const containerRef = useRef<HTMLFormElement>(null);
  useOnClickOutside(containerRef, () => setIsActive(false));

  const { register, handleSubmit, setFocus } = useForm<SearchForm>({
    defaultValues: { query: query.get('query') || '' },
  });
  const onSubmit: SubmitHandler<SearchForm> = (data) =>
    navigate(`/search?query=${data.query}`);

  useEffect(() => {
    isActive && setFocus('query');
  }, [isActive, setFocus]);

  return (
    <Container
      ref={containerRef}
      onSubmit={handleSubmit(onSubmit)}
      variants={containerVariants}
      initial="inactive"
      animate={isActive ? 'active' : 'inactive'}
    >
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={toggleIsActive}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 11C13 13.7614 10.7614 16 8 16C5.23858 16 3 13.7614 3 11C3 8.23858 5.23858 6 8 6C10.7614 6 13 8.23858 13 11ZM14.0425 16.2431C12.5758 17.932 10.4126 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 11.9287 15.8417 12.8205 15.5507 13.6497L24.2533 18.7028L22.7468 21.2972L14.0425 16.2431Z"
          fill="currentColor"
        ></path>
      </Svg>
      <Input
        {...register('query', { required: true, maxLength: 80 })}
        type="text"
        placeholder="Titles, people, genres"
        autoComplete="off"
        variants={inputVariants}
        initial="inactive"
        animate={isActive ? 'active' : 'inactive'}
      />
    </Container>
  );
};

export default SearchBox;
