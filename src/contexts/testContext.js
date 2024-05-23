import {createContext, useContext, useReducer} from "react";
import testAction from "@/core/testAction";

const initialState = {
    firstName: "Vuk",
    email: "vuk.pavlicevic.21@singimail.rs",
}

const testContext = createContext();

const testReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case testAction.CHANGE_EMAIL:
            return {...state, email: action.payload};
        case testAction.CHANGE_FIRST_NAME:
            return {...state, firstName: action.payload};
        default:
            return state;
    }
};

const TestProvider = ({ children }) => {
    const [state, dispatch] = useReducer(testReducer, initialState);

    const value = { state, dispatch };

    return (
        <testContext.Provider value={value}>
            {children}
        </testContext.Provider>
    );
};

const useTestActions = () => {
    const context = useContext(testContext);

    if (context === undefined) {
        throw new Error('testActions must be used within a TestProvider');
    }

    return context;
};

export { TestProvider, useTestActions };
