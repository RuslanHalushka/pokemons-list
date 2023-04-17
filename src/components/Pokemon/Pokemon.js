import './Pokemon.css'

export const Pokemon = ({name, id, types, onSelectedPokemon}) =>{
    const whichType = types?.map((value, index) => {
        if(value === 'fire') {
            return <div className={'red blocksOfTypes'} key={index}>{value}</div>
        }else if(value === 'grass') {
            return <div className={'green blocksOfTypes'} key={index}>{value}</div>
        }else if(value === 'poison') {
            return <div className={'purple blocksOfTypes'} key={index}>{value}</div>
        }else if(value === 'flying') {
            return <div className={'blue blocksOfTypes'} key={index}>{value}</div>
        }else if(value === 'water') {
            return <div className={'darkBlue blocksOfTypes'} key={index}>{value}</div>
        }else if(value === 'bug') {
            return <div className={'brown blocksOfTypes'} key={index}>{value}</div>
        }else if(value === 'electric') {
            return <div className={'yellow blocksOfTypes'} key={index}>{value}</div>
        }else if(value === 'normal') {
            return <div className={'normal blocksOfTypes'} key={index}>{value}</div>
        }else if(value === 'ground') {
            return <div className={'ground blocksOfTypes'} key={index}>{value}</div>
        }else if(value === 'fairy') {
            return <div className={'fairy blocksOfTypes'} key={index}>{value}</div>
        }else return <div className={'otherColor blocksOfTypes'} key={index}>{value}</div>
    })

    const handleClick = () =>{
        onSelectedPokemon(id);
    };

    return(
        <div className={'allPage'} onClick={handleClick}>
            <div className={'firstBlock'}>
                <div className={'somePhoto'}>
                    <div className={'line line1'}></div>
                    <div className={'line line2'}></div>
                </div>
                <div className={'someInf'}>
                    <div className={'text-st'}>{name}</div>
                    <div className={'contentOfTypes'}>{whichType}</div>
                </div>
            </div>
        </div>
    )
}
