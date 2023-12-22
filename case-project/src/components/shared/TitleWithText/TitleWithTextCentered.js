export function TitleWithTextCentered({title, text}){
    return(
        <div className='text-center mt-5 mb-5'>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    );
}