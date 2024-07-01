import styled from './Container.module.css';

function Container({children}) {
  return (
    <div className={styled.container}>{children}</div>
  )
}

export default Container;