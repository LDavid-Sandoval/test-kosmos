import React, { useState, useRef, memo } from "react";
import Moveable from "react-moveable";
import ReactLoading from "react-loading";
import MoveableHelper from "moveable-helper";
import useFetch from "../../hooks/useFetch";

const ComponentMoveable = ({ id, removeItem, fitType }) => {
  const { data, loading } = useFetch();
  const [isClicked, setIsClicked] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [helper] = useState(() => {
    return new MoveableHelper();
  });
  const targetRef = useRef();

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
    }
  };

  const handleHover = () => {
    setIsHover(true);
  };

  const handleLeave = () => {
    setIsHover(false);
    setIsClicked(false);
  };
  return (
    <div className='container-moveable' onClick={handleClick}>
      {!loading && (
        <div
          className='image-contain'
          style={{
            backgroundImage: `url(${data.url})`,
            backgroundSize: `${fitType}`,
          }}
          ref={targetRef}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}>
          <div>
            <button
              className='item-button margin-button'
              onClick={() => {
                removeItem(id);
              }}>
              remove Item
            </button>
          </div>
        </div>
      )}
      {loading && (
        <ReactLoading
          type='spin'
          color='#367AF6'
          height={"20%"}
          width={"20%"}
        />
      )}
      <Moveable
        target={targetRef}
        draggable={isClicked & isHover}
        scalable={isClicked & isHover}
        keepRatio={isClicked & isHover}
        rotatable={isClicked & isHover}
        onDragStart={helper.onDragStart}
        onDrag={helper.onDrag}
        onScaleStart={helper.onScaleStart}
        onScale={helper.onScale}
        onRotateStart={helper.onRotateStart}
        onRotate={helper.onRotate}
        hideDefaultLines={isClicked & isHover}
      />
    </div>
  );
};

export default memo(ComponentMoveable);
