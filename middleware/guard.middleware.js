import ApiError from "../exceptions/api.error";
import tokenService from "../service/token.service";

export default async function(req, res, next) {
  try {
    const authorizationHeader = req.get('authorization')
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }
    
    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }
    
    const userData = await tokenService.verifyAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }
    req.user = userData
    req.user.accessToken = accessToken
    next()
  } catch (e) {
    return next(ApiError.UnauthorizedError())
  }
}