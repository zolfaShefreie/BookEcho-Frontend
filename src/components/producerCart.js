import ReactRoundedImage from "react-rounded-image";
import ReactPlayer from "react-player";
import DefaultImg from "../images/default-avatar.jpg"



const ProducerCart = (props)=>{
    return (
        <div className="card text-left ml-4 bg-dark" style={{color: 'antiquewhite', width: '60%'}}>
            <ReactRoundedImage
                image={props.avatar ? props.avatar: DefaultImg}
            roundedColor="#343a40"
            roundedSize="0"
           />
            <div className="card-body ml-4">
                <h5 className="card-text">{props.last_name+" "+props.first_name}</h5>
                <h5 className="card-text">{props.username}</h5>

                <ReactPlayer className="card-text mt-4"
                              // url={props.info['voice_sample']? props : ''}
                    url="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
                    width="80%"
                    height="30%"
                    playing={false}
                    controls={true}/>
                    <button className="btn btn-dark mt-2">make request</button>

            </div>
        </div>
        )


}

export default ProducerCart;