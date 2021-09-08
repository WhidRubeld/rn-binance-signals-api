import { getRepository } from 'typeorm'
import { User } from '../entity'

type FormattedUser = {
  id: number
  username: string
  createdAt: number
  updatedAt: number
}

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({ username })
  if (!user) return null
  return user
}

export const getUserById = async (id: number): Promise<User | null> => {
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({ id })
  if (!user) return null
  return user
}

export const updateUser = async (user: User): Promise<User | null> => {
  const userRepository = getRepository(User)
  try {
    const res = await userRepository.save(user)
    return res
  } catch (e) {
    return null
  }
}

export const createUser = async (user: User): Promise<User | null> => {
  const userRepository = getRepository(User)
  try {
    const res = await userRepository.save(user)
    return res
  } catch (e) {
    return null
  }
}

export const responseUser = (user: User): FormattedUser => {
  const { id, username, createdAt, updatedAt } = user
  return {
    id,
    username,
    createdAt: createdAt.getTime(),
    updatedAt: updatedAt.getTime()
  }
}
