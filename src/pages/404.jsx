import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const { error } = useRouteError();
    if (error) {
        return (
            <div className="error-page">
                <div className="error-page__container">
                    <h1 className="error-page__title">404</h1>
                    <h2 className="error-page__subtitle">Page Not Found</h2>
                    <p className="error-page__description">{error.message}</p>
                    <Link to="/"><p className="error-page__description">Kembali ke Homepages</p></Link>
                </div>
            </div>
        );
    }
}


export default ErrorPage;