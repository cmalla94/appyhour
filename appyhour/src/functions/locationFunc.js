//HELPER FUNCTIONS FOR LOCATION.JS
//---------------------------------------
//MERGE DATA FUNCTION
export function mergeData(arr1, arr2) {
    let dataArray = arr1
    let foursquareData = arr2
    //STEP 1: get both arrays in the same order
    //map by the id number
    let mappedData = dataArray.map((el, i) => {
      return {index: i, value: el.id}
    })
    // console.log("mappedData ========================")
    // console.log(mappedData)
    // console.log("end===f=sdfa=sd=f=asdf=asd=f=asd=f=asd=f=asd=f=asd=f")
    let mappedFoursquare = foursquareData.map((el, i ) => {
      return {index: i, value: el.id}
    })
    //SORT by the ID numbers
    mappedData.sort(function(a,b){
      if (a.value > b.value) {
        return 1
      }
      if (a.value < b.value) {
        return -1
      }
      return 0
    })
    // console.log("mappedData SORTED ======================")
    // console.log(mappedData)
    // console.log("end-=====================================")
    mappedFoursquare.sort(function(a,b){
      if (a.value > b.value) {
        return 1
      }
      if (a.value < b.value) {
        return -1
      }
      return 0
    })
    // console.log("mappedFoursquare SORTED========================")
    // console.log(mappedFoursquare)
    // console.log("end======================================")
    //Step 2: NOW PUSH THE OBJECTS FROM dataArray and foursquareData into new array with a certain order
    let data = []
    mappedData.forEach((obj) => {
      data.push(dataArray[obj.index])
    })
    // console.log("data======================================")
    // data ? console.log(data) : null
    // console.log("end--------------------------------------")
    let fsData = []
    mappedFoursquare.forEach((obj) => {
      fsData.push(foursquareData[obj.index])
    })
    //STEP 3 merge the two arrays
    let i = 0
    let merge = false
    data.forEach((obj) => {
      //console.log("fsData[i] ====== "  + fsData[i])
      Object.assign(obj, fsData[i])
      //console.log("data[i].name ====== " + data[i].name);
      i++
      i === data.length ? merge = true : null
    })
    const merged = i === data.length ? data : false
    //console.log(merged)
    return merged
  }

//----------------------------------------------------------------------------------
//helper function needed for rendering the FlatList, each item is required a key
export function _keyExtractor(item){
  return item.id
}
