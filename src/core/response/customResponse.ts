export class CustomResponse<T> {
  private _success: boolean
  private _data: T | null
  private _errors: string[] | null

  constructor() {
    this._success = true
  }

  // getters
  public get success(): boolean {
    return this._success
  }

  public get data(): T | null {
    return this._data
  }

  public get errors(): string[] | null {
    return this._errors
  }

  // setters
  private set success(value: boolean) {
    this._success = value
  }

  public set data(value: T | null) {
    this._data = value
  }

  private set errors(value: string[] | null) {
    this._errors = value
  }

  addError(errors: Array<string>): CustomResponse<T> {
    const response = new CustomResponse<T>()
    response.errors = errors
    response.success = false

    return response
  }
}
