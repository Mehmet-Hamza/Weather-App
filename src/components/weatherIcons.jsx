export const GetWeatherIcon = (code) => {
  let iconUrl = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun/3D/sun_3d.png";

  if (code === 0) {
    iconUrl = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun/3D/sun_3d.png";
  } 
  else if (code === 1 || code === 2) {
    iconUrl = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun%20behind%20cloud/3D/sun_behind_cloud_3d.png";
  } 
  else if (code === 3) {
    iconUrl = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud/3D/cloud_3d.png";
  } 
  else if (code === 45 || code === 48) {
    iconUrl = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fog/3D/fog_3d.png";
  } 
  else if (code === 51 || code === 53 || code === 55) {
    iconUrl = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud%20with%20rain/3D/cloud_with_rain_3d.png";
  } 
  else if (code === 61 || code === 63 || code === 65) {
    iconUrl = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud%20with%20rain/3D/cloud_with_rain_3d.png";
  } 
  else if (code === 71 || code === 73 || code === 75) {
    iconUrl = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Snowflake/3D/snowflake_3d.png";
  } 
  else if (code === 80 || code === 81 || code === 82) {
    iconUrl = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud%20with%20lightning%20and%20rain/3D/cloud_with_lightning_and_rain_3d.png";
  } 
  else if (code === 95 || code === 96 || code === 99) {
    iconUrl = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud%20with%20lightning/3D/cloud_with_lightning_3d.png";
  }

  return iconUrl;
};