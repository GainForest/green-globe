import styled from 'styled-components'

export const IconButton = ({ buttonIcon, active, onClick, dataTooltipId }) => {
  if (buttonIcon?.includes('/')) {
    return (
      <IconButtonContainer
        active={active}
        onClick={onClick}
        data-tooltip-id={dataTooltipId}
      >
        <img
          alt={'dendogram-icon'}
          style={{
            display: 'table',
            margin: '0 auto',
            fontSize: '24px',
            color: active ? '#ffffff' : '#000000',
            width: '28px',
          }}
          src={`${process.env.AWS_STORAGE}${buttonIcon}_black.svg`}
        />
      </IconButtonContainer>
    )
  } else {
    return (
      <IconButtonContainer
        active={active}
        onClick={onClick}
        data-tooltip-id={dataTooltipId}
      >
        <span
          className="material-icons-round"
          style={{
            display: 'table',
            margin: '0 auto',
            fontSize: '24px',
            color: active ? '#ffffff' : '#000000',
            lineHeight: '44px',
            width: '42px',
          }}
        >
          {buttonIcon}
        </span>
      </IconButtonContainer>
    )
  }
}

export const IconButtonContainer = styled.button<{
  active: boolean
}>`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 0.5em;
  cursor: pointer;
  padding: 0;
  border: none;
  height: 42px;
  width: 42px;
  background-color: ${({ active }) => (active ? '#669629' : '#ffffff')};
  &:hover {
    background-color: ${({ active }) => (active ? '#669629' : '#e9f5da')};
  }
`
