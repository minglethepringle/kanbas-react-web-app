import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    const active = (path: string) => (pathname.includes(path) ? "active" : "");
    const { pathname } = useLocation();

    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0 pe-3">
            {links.map((link) => (
                <Link
                    key={link}
                    to={`/Kanbas/Account/${link}`}
                    className={`list-group-item ${pathname.includes(link) ? "active" : "text-danger"} border border-0`}
                >
                    {link}
                </Link>
            ))}
            {currentUser && currentUser.role === "ADMIN" && (
                <Link to={`/Kanbas/Account/Users`} 
                className={`list-group-item ${pathname.includes("Users") ? "active" : "text-danger"} border border-0`}> Users </Link>)}
        </div>
    );
}
