export default (time) => {
  let t = Math.floor(time * 1000)
  let Dates = new Date(t)
  let year = Dates.getFullYear()
  let month = () => {
    let m = Dates.getMonth() + 1
    if (m < 10) return '0' + m
    return m
  }
  let date = Dates.getDate()
  return `${year} / ${month()} / ${date}`
}
