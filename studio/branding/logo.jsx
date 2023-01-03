import styled, { css } from 'styled-components'

import './skin.css?raw'

const Logo = ({ projectName }) => {
  return (
    <Icon isLogin={projectName}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 593.72 499.12">
        <rect width="500" height="500" fill="#fff" rx="15"/>
      </svg>
    </Icon>
  )
}

const Icon = styled.div`
  display: block;
  width: auto;
  height: 2em;
  max-width: 100%;
  margin: -0.75rem auto;
  color: white;

  ${(props) =>
    props.isLogin &&
    css`
      display: block;
      margin: 0 auto;
      height: 4rem;
      color: black;
    `}

  svg {
    display: block;
    margin: 0 auto;
    height: 100% !important;
    width: auto;
    fill: currentColor;
  }
`

export { Logo }
