addpath('D:\bin\jsonlab-master')
data = loadjson("out.json");
#disp(data.features(1).geometry.coordinates)
x = [];
y = [];
z = [];
for feature = data.features
  if size(feature.geometry.coordinates)(2)==3
    x_sub = feature.geometry.coordinates(:,1);
    y_sub = feature.geometry.coordinates(:,2);
    z_sub = feature.geometry.coordinates(:,3);
    x = [x,x_sub'];
    y = [y,y_sub'];
    z = [z,z_sub'];
  elseif size(feature.geometry.coordinates)(2)==2
    x_sub = feature.geometry.coordinates(:,1);
    y_sub = feature.geometry.coordinates(:,2);
    z_sub = zeros(size(feature.geometry.coordinates)(1),1);
    x = [x,x_sub'];
    y = [y,y_sub'];
    z = [z,z_sub'];
  endif
  
endfor
printf("X = %f %f\n",min(x),max(x))
printf("Y = %f %f\n",min(y),max(y))
printf("Z = %f %f\n",min(z),max(z))
x_range = [min(x):5:max(x)];
y_range = [min(y):5:max(y)];
ori_x_range = size(x_range)(2);
ori_y_range = size(y_range)(2);
xi = repmat(x_range,[1,size(y_range)(2)]);
yi = repelem(y_range,size(x_range)(2));

zi = griddata(x,y,z,xi,yi);
printf("Size xi %d\n",size(xi)(2))
printf("Size yi %d\n",size(yi)(2))
#xi = [xi,x];
size(xi)
#size(x)
#yi = [yi,y];
size(yi)
#size(y)
#zi = [zi',z];
size(zi)
#size(z)
#size(z)
caxis("auto")
printf("%d %d\n",ori_x_range,ori_y_range)
dlmwrite("zi2.csv",[xi',yi',zi],';')
#mesh(xi,yi,zi);