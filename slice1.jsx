import ReactDOM from "react-dom";
import React from "react";
import { useState } from "react";
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {count: 0, color: 'red'};

const slice = createSlice({
    name : "counter",
    initialState,
    reducers: {
        addOne(state) {
            state.count = state.count + 1;
        },
        add(state, action) {
            state.count = state.count + action.payload;
        }
    }
});
export const {actions, reducer} = slice;