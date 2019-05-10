//load items from localstorage
export const loadItems = () => {
    return JSON.parse(localStorage.getItem('items'))
  } 
 
//save items to localstorage
export const saveItem = (items) => {
    return new Promise((resolve, reject) => {
      localStorage.setItem('items', JSON.stringify(items))
      resolve(loadItems())
    })
} 