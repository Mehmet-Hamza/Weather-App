import logo from "../assets/lion-head-png-logo-4.png" 
export default function Header(){

return(
<header className="app-header">
    <div className="header-content">
        <img style={{ width: '70px' }} src={logo} alt="Lion Weather App Logo"/>
          <h1 className="logo-title">Lion Weather</h1>
          <div className="header-icon-container">
          </div>
    </div>
</header>
)
}