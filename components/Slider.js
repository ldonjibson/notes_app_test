import Slider from 'react-slick';
import { addBaseUrl } from '../constant'

class SimpleSlider extends React.Component  {
  constructor(props){
    super(props);
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>
          {this.props.Images.map((image, index) => (
            <div key={index}>
              <img src={addBaseUrl(image.url)} style={{width : "100%"}}/>
            </div>
            ))}
        </Slider>
      </div>
    );
  }
}

export default SimpleSlider;