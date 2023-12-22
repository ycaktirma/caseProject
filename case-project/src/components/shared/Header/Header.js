import './Header.css'
import 'bootstrap'
export function Header(){

    const returnHome = () =>{
        window.location = '/home';
    };

    return(
        <header className='header'>
            <h4 onClick={returnHome} className='header-title'> Case project </h4>
        </header>
    );
}