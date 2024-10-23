import './TitleTile.css'

interface TitleTileProps {
    imageName: string,
    title: string
}

const TitleTile = (props: TitleTileProps) => {
  return (
    <div className='box'>
        <div className='img-div'><img src={`/assets/${props.imageName}.png`} alt={props.imageName} className='title-tile-image'/></div>
        <p>{props.title}</p>
    </div>
  )
}

export default TitleTile;