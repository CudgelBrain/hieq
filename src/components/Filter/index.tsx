import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Filter = () => {
  const [percentage, setPercentage] = React.useState({
    behavioral: 0,
    cognitive: 0,
    functional: 0,
    experience: 0,
  });

  const { behavioral, cognitive, functional, experience } = percentage;

  return (
    <div className='rt-part'>
      <div className='filter-wrapper'>
        <div className='filter-heading'>
          <span>Filters</span>
          <button type='submit' className='reset-txt-btn'>
            Reset
          </button>
        </div>
        <div className='filter-widget mt-4 pb-1 sr-green'>
          <h3 className='filter-widget-heading mb-2'>Behavioural</h3>
          <div className='slidecontainer'>
            <Slider
              min={0}
              max={100}
              value={behavioral}
              onChange={(value) => setPercentage({ ...percentage, behavioral: value as number })}
            />
            <span>{behavioral}</span>
            <div className='rg-slider-text'>
              <span className='small'>0</span>
              <span className='small'>100</span>
            </div>
          </div>
        </div>
        <div className='filter-widget mt-4 pb-1 sr-yellow'>
          <h3 className='filter-widget-heading mb-2'>Cognitive</h3>
          <div className='slidecontainer'>
            <Slider
              min={0}
              max={100}
              value={cognitive}
              onChange={(value) => setPercentage({ ...percentage, cognitive: value as number })}
            />
            <span>{cognitive}</span>
            <div className='rg-slider-text'>
              <span className='small'>0</span>
              <span className='small'>100</span>
            </div>
          </div>
        </div>
        <div className='filter-widget mt-4 pb-1 sr-blue'>
          <h3 className='filter-widget-heading mb-0'>Functional</h3>
          <div className='small mb-2'>Domain: Sales &amp; Marketing</div>
          <div className='slidecontainer'>
            <Slider
              min={0}
              max={100}
              value={functional}
              onChange={(value) => setPercentage({ ...percentage, functional: value as number })}
            />
            <span>{functional}</span>
            <div className='rg-slider-text'>
              <span className='small'>0</span>
              <span className='small'>100</span>
            </div>
          </div>
        </div>
        <div className='filter-widget mt-4 pb-1'>
          <h3 className='filter-widget-heading mb-2'>Status</h3>
          <div className='custom-control custom-checkbox'>
            <input type='checkbox' className='custom-control-input' id='st1' name='' />
            <label className='custom-control-label' htmlFor='st1'>
              Active
            </label>
          </div>
          <div className='custom-control custom-checkbox'>
            <input type='checkbox' className='custom-control-input' id='st2' name='' />
            <label className='custom-control-label' htmlFor='st2'>
              Under Review
            </label>
          </div>
          <div className='custom-control custom-checkbox'>
            <input type='checkbox' className='custom-control-input' id='st3' name='' />
            <label className='custom-control-label' htmlFor='st3'>
              Rejected
            </label>
          </div>
          <div className='custom-control custom-checkbox'>
            <input type='checkbox' className='custom-control-input' id='st4' name='' />
            <label className='custom-control-label' htmlFor='st4'>
              Need Actions
            </label>
          </div>
        </div>
        <div className='filter-widget mt-4 pb-1'>
          <h3 className='filter-widget-heading mb-2'>Experience</h3>
          <div className='slidecontainer'>
            <Slider
              min={0}
              max={30}
              value={experience}
              onChange={(value) => setPercentage({ ...percentage, experience: value as number })}
            />
            <span>{experience}</span>
            <div className='rg-slider-text'>
              <span className='small'>0 yrs</span>
              <span className='small'>30+ yrs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
