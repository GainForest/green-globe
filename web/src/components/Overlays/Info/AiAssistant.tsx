import { InfoBox } from './InfoBox'
export const AiAssistant = ({ mediaSize }) => {
  return (
    <InfoBox mediaSize={mediaSize}>
      <iframe
        title={'Polly chatbot'}
        style={{ height: '100%', width: '100%' }}
        src="https://polly.gainforest.earth/"
      />
    </InfoBox>
  )
}
