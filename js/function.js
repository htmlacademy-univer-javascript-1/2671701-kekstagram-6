const checkMeetingsAndWorkTime = (StartDay, EndDay, MeetingStart, MeetingTime) => {
  if (StartDay.split(':')[0] > MeetingStart.split(':')[0]) {
    return false;
  }
  if (StartDay.split(':')[0] === MeetingStart.split(':')[0]) {
    if (StartDay.split(':')[1] > MeetingStart.split(':')[1]) {
      return false;
    }
  }
  const EndMeetingTime = {
    hour: Number(MeetingStart.split(':')[0]) + Math.floor(MeetingTime / 60),
    minute: Number(MeetingStart.split(':')[1]) + MeetingTime % 60
  };

  if (EndDay.split(':')[0] > EndMeetingTime.hour) {
    return true;
  }
  if (EndDay.split(':')[0] === EndMeetingTime.hour) {
    if (EndDay.split(':')[1] >= EndMeetingTime.minute) {
      return true;
    }
  }
  return false;
};
export { checkMeetingsAndWorkTime };
