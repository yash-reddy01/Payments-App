import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    return <div>
        <AppBar label={"Payments App"}/>
        <Balance value={"10000"}/>
        <Users />
    </div>
}