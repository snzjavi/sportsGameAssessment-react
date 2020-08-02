class Team extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shots: 0,
      score: 0
    }

    this.shotSound = new Audio('./assets/Back+Board.wav')
    this.scoreSound = new Audio('./assets/Swish.wav')
  }


  shotHandler = () => {
    let score = this.state.score
    this.shotSound.play()

    if (Math.random() > 0.5) {
      score += 1

      setTimeout(() => {
        this.scoreSound.play()
      }, 99)
    }

    this.setState((state, props) => ({
      shots: state.shots + 1,
      score
    }))
  }


  render() {
    let shotPercentageDiv
    if (this.state.shots) {
      const shotPercentage = Math.round((this.state.score / this.state.shots) * 100)
      shotPercentageDiv = (
        <div>
          <strong>Shooting %:</strong> {shotPercentage}
        </div>
      )
    }


    return (
      <div className='Team'>
        <h2>{this.props.name}</h2>

        <div className="identity">
          <img src={this.props.logo} alt={this.props.name} />
        </div>

        <div>
          <strong>Shots:</strong> {this.state.shots}
        </div>

        <div>
          <strong>Score:</strong> {this.state.score}
        </div>

        {shotPercentageDiv}

        <button onClick={this.shotHandler}>Shoot!</button>
      </div>

    )
  }
}

function Game(props) {
  return (
    <div className="Game">
      <h1>Welcome to {props.venue}</h1>
      <div className="stats">
        <Team
          name={props.visitingTeam.name}
          logo={props.visitingTeam.logoSrc}
        />

        <div className="versus">
          <h1>VS</h1>
        </div>

        <Team
          name={props.homeTeam.name}
          logo={props.homeTeam.logoSrc}
        />
      </div>
    </div>
  )
}



// Default App component that all other compents are rendered through
function App(props) {
  const Tropics = {
    name: 'Flint Tropics',
    logoSrc: './assets/FlintTropics.png'
  }

  const Colonels = {
    name: 'Kentucky Colonels',
    logoSrc: './assets/KentuckyColonelslogo.jpg'
  }

  const Spirits = {
    name: 'Spirits of St. Louis',
    logoSrc: './assets/spirits.png'
  }

  const Stars = {
    name: 'Utah Stars',
    logoSrc: './assets/utahStars.png'
  }

  return (
    <div className="App">
    <Game
      venue="Louisville Gardens"
      homeTeam={Tropics}
      visitingTeam={Colonels}
    />
    <Game
      venue="The Salt Palace"
      homeTeam={Spirits}
      visitingTeam={Stars}
    />
    </div>
  )
}

//Render the application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);