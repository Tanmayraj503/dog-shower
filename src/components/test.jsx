import CircularText from './CircularText.jsx';
function Test() {
    return (
        <div className='bg-white p-[182px] flex items-center justify-center '>
            <CircularText
                text="D O G S * & * C A T S * S H O W E R * "
                spinDuration={20}
                onHover="speedUp"
            />
        </div>

    )
}
export default Test;