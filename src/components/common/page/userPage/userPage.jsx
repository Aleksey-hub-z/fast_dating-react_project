import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../api";
import QualitiesList from "../../../ui/qualities/qualitiesList";
import PropTypes from "prop-types";
import Comments from "../comments/comments";
import CommentsListComponent from "../comments/commentsListComponent";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const [comments, setComments] = useState();
    const navigate = useNavigate();
    const params = useParams();
    const handleEditUser = () => {
        navigate(`/users/${params.userId}/edit`);
    };
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    return user ? (
        <>
            <div className="m-5">
                <div className="container overflow-hidden">
                    <div className="row g-5 gy-4">
                        <div className="col-md-4 mb-3  text-center">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                                        <i
                                            className="bi bi-gear"
                                            onClick={handleEditUser}
                                        ></i>
                                    </button>
                                    <div className="d-flex flex-column align-items-center text-center position-relative">
                                        <img
                                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                                Math.random() + 1
                                            )
                                                .toString(36)
                                                .substring(7)}.svg`}
                                            className="rounded-circle shadow-1-strong me-3"
                                            alt="avatar"
                                            width="165"
                                            height="165"
                                        />
                                        <div className="mt-3">
                                            <h4>{user.name}</h4>
                                            <p className="text-secondary mb-1">
                                                {user.profession.name}
                                            </p>
                                            <div className="text-muted">
                                                <i
                                                    className="bi bi-caret-down-fill text-primary"
                                                    role="button"
                                                ></i>
                                                <i
                                                    className="bi bi-caret-up text-secondary"
                                                    role="button"
                                                ></i>
                                                <span className="ms-2">
                                                    {user.rate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">
                                        <span>Qualities</span>
                                    </h5>
                                    <p className="card-text">
                                        <QualitiesList
                                            qualities={user.qualities}
                                        />
                                    </p>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">
                                        <span>Completed meetings</span>
                                    </h5>

                                    <h1 className="display-1">
                                        {user.completedMeetings}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <CommentsListComponent pageId={userId} />

                            {comments.length > 0 && (
                                <Comments comments={comments} userId={userId} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <h3>Loading...</h3>
    );
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
