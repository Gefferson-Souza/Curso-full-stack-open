const Notification = ({message, error}) => {
    return (
        <div>
            {message && 
            <div className="notification">
                <h1 className="sucess">{message}</h1>
            </div>
            }
            {error && 
            <div className="notification">
                <h1 className="error">{error}</h1>
            </div>
            }
        </div>
    )
}

export default Notification;