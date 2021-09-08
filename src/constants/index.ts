import express from 'express'
import expressWs from 'express-ws'

export const server = expressWs(express())
export const app = server.app
