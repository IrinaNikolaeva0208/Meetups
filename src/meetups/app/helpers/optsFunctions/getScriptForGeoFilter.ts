export function getScriptForGeoFilter(longtitude: string, latitude: string) {
  return `double lat1 = doc['latitude'].value; 
    double lon1 = doc['longtitude'].value; 
    double lat2 = ${latitude}; 
    double lon2 = ${longtitude}; 
    double R = 6371; 
    double dLat = (lat2 - lat1) * (Math.PI / 180); 
    double dLon = (lon2 - lon1) * (Math.PI / 180); 
    double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    double distance = R * c; 
    return distance < 100;`;
}
