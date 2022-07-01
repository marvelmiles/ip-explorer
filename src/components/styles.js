import styled, { createGlobalStyle, css } from "styled-components";

export const CSSBaseStyle = createGlobalStyle`
*,*::after,*::before {
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: ${(props) => props.theme.fonts[0]};
    outline:0;
}
body {
  background-color: ${({ theme }) => theme.palette.primary.main};
  height:100vh;
}

#root {
  display:flex;
  flex-direction:column;
  min-height:100vh;
}

`;

export const Stack = styled.div`
  display: flex;
  flex-direction: ${({ direction }) =>
    (direction || "column").replace(/row/gi, "flex")};
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  flex-wrap: wrap;
  box-shadow: ${({ elevation = 0, theme }) => theme.shadows[String(elevation)]};
  background-color: ${({ bgColor, theme }) =>
    bgColor
      ? theme.palette.primary[bgColor] || theme.palette.primary.main
      : "transparent"};
`;

export const Container = styled(Stack)`
  flex-grow: 1;
  min-width: 100%;
  min-height: 100%;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.light};
`;

export const Typography = styled.p`
  word-break: break-word;
  ${({ variant }) => {
    switch (variant) {
      case "title1":
        return css`
          color: ${({ theme, color }) => color || theme.palette.primary.main};
          font-size: 3rem;
          font-weight: 900;
          line-height: 1.5em;
          letter-spacing: 0em;
        `;
      case "title2":
        return css`
          color: ${({ theme, color }) => color || theme.palette.primary.main};
          font-weight: 600;
          line-height: 1em;
          font-size: 2.5rem;
          letter-spacing: 0.00938em;
        `;
      case "lead":
        return css`
          color: ${({ theme }) => theme.palette.secondary.main};
          font-weight: 600;
          line-height: 2.5em;
          font-size: 2rem;
          letter-spacing: 0.00938em;
          margin: 5px 0;
        `;
      case "caption":
        return css`
          line-height: 3em;
          font-weight: 600;
          font-size: 1.8rem;
        `;
      //learn
      default:
        return css`
          font-size: 16px;
          margin-bottom: 0;
        `;
    }
  }};
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 0;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.primary.main};
  box-shadow: ${({ theme, elevation = 0 }) => theme.shadows[elevation]};
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.palette.primary.light};
    & * {
      color: ${({ theme, hoverColor }) =>
        hoverColor || theme.palette.secondary.main};
    }
  }

  ${({ variant }) => {
    switch (variant) {
      case "radius":
        return css`
          padding: 5px;
          padding-left: 35px;
          padding-right: 35px;
          border-radius: 32px;
          & > * {
            padding: 0;
            font-weight: 900;
            font-size: 2rem;
          }
        `;
      default:
        css``;
    }
  }}
`;

export const IconButton = styled(Button)`
  display: inline-flex;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 0 5px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  & svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.palette.secondary.main || "red"};
  }
`;

export const Input = styled.input.attrs(({ type }) => ({
  type: type || "text",
}))`
  width: 100%;
  padding-left: 25px;
  font-size: 20px;
  background-color: transparent;
  outline: 0;
  margin: 10px 0;
  color: ${({ theme }) => theme.palette.secondary.main};
  &::placeholder {
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;

export const SearchBar = styled(Stack)`
  border-radius: 32px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border: 3px solid
    ${({ theme, error }) =>
      error ? theme.palette.error.main : theme.palette.primary.light};
  margin: 10px auto;
  width: 100%;
  flex-wrap: nowrap;
  padding: 0;
  & input {
    border: 0;
    margin: 0;
    boder-radius: inherit;
  }
  & button {
    margin-right: 0px;
  }
`;

export const Zoom = styled.div`
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  transform: ${({ animate }) => (animate ? "scale(1)" : "scale(1.1)")};
  will-change: transform;
  transition: all 0.5s cubic-bezier(0, 0, 0.21, 1);
  padding: 0;
  & > div {
    box-shadow: ${({ theme }) => theme.shadows[12]};
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index:  ${({ open }) => (open ? 1300 : -1)};
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.palette.backdrop}
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  will-change: opacity;
  transition: all 0.233s cubic-bezier(0, 0, 0.21, 1);
  transition-delay: ${({ open }) => (open ? "0s" : "0.5s")}; 
  & > * {
    width: 100%;
    height: 100%;
  }
`;

export const ModalContainer = styled(Stack)`
  min-width: 100%;
  min-height: 100%;
  overflow: auto;
`;

export const ModalTitle = styled.div``;

export const ModalContent = styled.div`
  max-width: ${({ theme, fullWidth }) =>
    theme.fullWidth ? "100%" : fullWidth || "600px"};
  max-height: 80vh;
  overflow: auto;
`;

export const Paper = styled.div`
  box-shadow: ${({ elevation = 12, theme }) =>
    theme.shadows[String(elevation)]};
  padding: 10px;
  background-color: ${({ bgColor, theme }) =>
    bgColor
      ? theme.palette.primary[bgColor] || theme.palette.primary.main
      : "#fff"};
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 10px 5px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
  & button {
    display: flex;
    width: 35px;
    height: 35px;
    align-self: center;
    & svg {
      font-size: 1.8rem;
    }
  }
`;

export const ListItemText = styled.div`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-weight: 600;
  font-size: 1.8rem;
  align-self: center;
`;
