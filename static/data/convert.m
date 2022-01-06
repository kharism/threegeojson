addpath('D:\bin\jsonlab-master')
data = loadjson("topDummy.json");
#disp(data.features(1).geometry.coordinates)
x = [];
y = [];
z = [];
for feature = data.features
  #disp(feature.geometry.coordinates)
  x_sub = feature.geometry.coordinates(:,1);
  y_sub = feature.geometry.coordinates(:,2);
  z_sub = feature.geometry.coordinates(:,3);
  x = [x,x_sub'];
  y = [y,y_sub'];
  z = [z,z_sub'];
endfor
printf("X = %f %f\n",min(x),max(x))
printf("Y = %f %f\n",min(y),max(y))
printf("Z = %f %f\n",min(z),max(z))
x_range = [min(x):10:max(x)];
y_range = [min(y):10:max(y)];
xi = repmat(x_range,[1,size(y_range)(2)]);
yi = repelem(y_range,size(x_range)(2));

zi = griddata(x,y,z,xi,yi);
printf("Size xi %d\n",size(xi)(2))
printf("Size yi %d\n",size(yi)(2))
size(xi)
size(yi)
size(zi)

dlmwrite("zi.csv",[xi',yi',zi],';')