import Session from './Session'
import Gateway from './Gateway'
import Robot from './Robot'
import Patients from './Patients'

export const session = new Session()
export const gateway = new Gateway()
export const patients = new Patients()
export const robot = new Robot()

export default {
    session,
    gateway,
    patients,
    robot
}