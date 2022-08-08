import ReactDOM from "react-dom";
import React from "react";
import { useState } from "react";
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { color: 'red'};

const slice = createSlice({
    name : "colorer",
    initialState,
    reducers: {
        changeColor(state) {
            color = color == 'red' ? 'green' : 'red'
        }
    }
});
export const {cactions, creducer} = slice;