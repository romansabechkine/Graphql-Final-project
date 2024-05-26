/*export enum likeTypes {
  HEART = "heart",
  SMILE = "smile",
  LAUGH = "laugh",     
  THUMBUP = "thumbup",
  THUMBDOWN = "thumbdown",
  ANGRY = "angry",    
  MEAN = "mean",      
}*/

export const likeTypes = new Map (
    [
        ["heart", "numberOfHeart"],
        ["smile", "numberOfSmile"],
        ["laugh", "numberOfLaugh"],
        ["thumbup", "numberOfThumbUp"],
        ["thumbdown", "numberOfThumbDown"],
        ["angry", "numberOfAngry"],
        ["mean", "numberOfMean"],
    ]
)
    
