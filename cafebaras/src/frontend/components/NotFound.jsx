import CafeNotFound from '../assets/Cafebara.gif'


function NotFound(){
    return(
        <div>
            <p style={{
                fontWeight: '500',
                fontSize: '3rem',
                padding: '0',
                margin: '0'

            }}
            >Route did not exist</p>
            <img src={CafeNotFound} alt="change route"></img>

        </div>
    )
}

export default NotFound