//Set up mouse down event
tool1.onMouseDown = function onMouseDown(event) {
  if(drawingMode == 0){
    currentPath = new Path();
    currentPath.strokeColor = curColor;
    currentPath.strokeWidth = curSize
    currentPath.add(event.point);
    allDrawingPath.push(currentPath);
  }
  else if(drawingMode == 1){
    pathForErase = new Path();
    pathForErase.strokeColor = new Color(0.99, 0.99, 0.99);
    pathForErase.strokeWidth = curSize + 3;
    allErasePath.push(pathForErase);
  }
}

tool1.onMouseDrag = function(event) {
  if(drawingMode == 0){
    currentPath.add(event.point);
  }
  else if(drawingMode == 1){
    pathForErase.add(event.point);
  }
}

tool1.onMouseUp = function(event){
  if(drawingMode == 1){
    pathForErase.blendMode = 'destination-out';
  }
}
