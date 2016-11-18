import home from './home'
import about from './about'
import login from './login'

export default (state) => {
  const { url } = state
  let page

  if (url === '/') {
    page = home(state)
  } else if (url === '/about') {
    page = about()
  } else if (url === '/login') {
    page = login()
  }

  return (
    <div>
      <nav>
        <a href='/'>home</a> | <a href='/login'>login</a> | <a href='/about'>about</a>
      </nav>
      <div id='page-content'>
        {page}
      </div>
    </div>
  )
}
