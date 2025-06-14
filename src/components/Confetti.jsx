import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export default function ConfettiComponent() {
    const { width, height } = useWindowSize()
    return (
        <Confetti width={width} height={height} />
    )
}