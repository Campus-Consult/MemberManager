using MemberManager.Domain.Entities;
using MemberManager.Domain.Enums;
using MemberManager.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemberManager.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        private static readonly string[] WORDS = new string[] { "Lorem", "Ipsum", "Dolar", "Si", "Achmet", "Greetings", "From", "Germany", "Beer", "Campus", "Consult" };
        private static readonly Gender[] ALL_GENDER = (Gender[])Enum.GetValues(typeof(Gender));

        public static async Task SeedDefaultUserAsync(UserManager<ApplicationUser> userManager)
        {
            var defaultUser = new ApplicationUser { UserName = "administrator@localhost", Email = "administrator@localhost" };

            if (userManager.Users.All(u => u.UserName != defaultUser.UserName))
            {
                await userManager.CreateAsync(defaultUser, "Administrator1!");
            }
        }

        public static async Task SeedRandomMemberDataAsync(ApplicationDbContext context, ApplicationDbContextSeedConfig config)
        {
            if (!config.Enabled)
            {
                return;
            }
            if (config.ClearExistingData)
            {
                if (!config.KeepPersons)
                {
                    context.People.RemoveRange(context.People);
                }
                context.PersonCareerLevels.RemoveRange(context.PersonCareerLevels);
                context.PersonMemberStatus.RemoveRange(context.PersonMemberStatus);
                context.PersonPositions.RemoveRange(context.PersonPositions);
                context.Positions.RemoveRange(context.Positions);
                context.CareerLevels.RemoveRange(context.CareerLevels);
                context.MemberStatus.RemoveRange(context.MemberStatus);
                await context.SaveChangesAsync();
                // this clears all actual data, add default data back in
                await SeedDefaultMemberDataAsync(context);
            }
            Random rand;
            if (config.Seed.HasValue)
            {
                rand = new Random(config.Seed ?? 0);
            }
            else
            {
                rand = new Random();
            }
            DateTime start = new DateTime(1990, 1, 1);
            DateTime end = new DateTime(2018, 12, 21);
            for (int i = 0; i < config.Persons; i++)
            {
                var firstName = RandomChars(rand, 1, 1).ToUpper() + RandomChars(rand, 2, 6);
                var lastName = RandomChars(rand, 1, 1).ToUpper() + RandomChars(rand, 5, 13);
                await context.People.AddAsync(new Person()
                {
                    AdressCity = RandomWord(rand),
                    AdressNo = rand.Next(300).ToString(),
                    AdressStreet = RandomSentence(rand, 1, 3),
                    AdressZIP = rand.Next(100000).ToString(),
                    Birthdate = RandomDate(rand, start, end),
                    EmailAssociaton = firstName.ToLower()[0] + lastName.ToLower() + "@campus-consult.org",
                    EmailPrivate = firstName.ToLower() + "." + lastName.ToLower() + "@gmail.com",
                    FirstName = firstName,
                    Gender = RandomGender(rand),
                    Surname = lastName,
                    MobilePrivate = rand.Next(1000000).ToString(),
                });
            }
            for (int i = 0; i < config.CareerLevels; i++)
            {
                string levelName = RandomChars(rand, 1, 1).ToUpper() + RandomChars(rand, 5, 10);
                await context.CareerLevels.AddAsync(new CareerLevel()
                {
                    IsActive = rand.Next(2) == 0,
                    Name = levelName,
                    ShortName = levelName.Substring(0, 1),
                });
            }
            for (int i = 0; i < config.Positions; i++)
            {
                string levelName = RandomChars(rand, 1, 1).ToUpper() + RandomChars(rand, 5, 10);
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = rand.Next(2) == 0,
                    Name = levelName,
                    ShortName = levelName.Substring(0, 1),
                });
            }
            for (int i = 0; i < config.MemberStatus; i++)
            {
                await context.MemberStatus.AddAsync(new MemberStatus()
                {
                    Name = RandomChars(rand, 1, 1).ToUpper() + RandomChars(rand, 2, 6),
                });
            }
            await context.SaveChangesAsync();
            var persons = await context.People
                .Include(p => p.PersonCareerLevels)
                .Include(p => p.PersonMemberStatus)
                .Include(p => p.PersonPositions).ToListAsync();
            var positions = await context.Positions.ToListAsync();
            var careerLevels = await context.CareerLevels.ToListAsync();
            var memberStatus = await context.MemberStatus.ToListAsync();

            if (persons.Any())
            {
                if (careerLevels.Any())
                {
                    for (int i = 0; i < config.PersonCareerLevels; i++)
                    {
                        var person = PickRandom(rand, persons);
                        var careerLevel = PickRandom(rand, careerLevels);
                        // get latest career level
                        var lastLevels = person.PersonCareerLevels.Where(level => level.EndDateTime == null).ToList();
                        if (lastLevels.Count > 0)
                        {
                            var lastLevel = lastLevels[0];
                            var lastDate = lastLevel.BeginDateTime;
                            if (lastDate > end)
                            {
                                continue;
                            }
                            var lastEndDate = RandomDate(rand, lastDate, end);
                            lastLevel.EndDateTime = lastEndDate;
                            await context.PersonCareerLevels.AddAsync(new PersonCareerLevel()
                            {
                                BeginDateTime = lastEndDate,
                                CareerLevelId = careerLevel.Id,
                                EndDateTime = null,
                                PersonId = person.Id,
                            });
                        }
                        else
                        {
                            var lastEndDate = RandomDate(rand, start, end);
                            await context.PersonCareerLevels.AddAsync(new PersonCareerLevel()
                            {
                                BeginDateTime = lastEndDate,
                                CareerLevelId = careerLevel.Id,
                                EndDateTime = null,
                                PersonId = person.Id,
                            });
                        }
                    }
                }

                if (memberStatus.Any())
                {
                    for (int i = 0; i < config.PersonMemberStatus; i++)
                    {
                        var person = PickRandom(rand, persons);
                        var memberStatu = PickRandom(rand, memberStatus);
                        // get latest career level
                        var lastStatus = person.PersonMemberStatus.Where(status => status.EndDateTime == null).ToList();
                        if (lastStatus.Count > 0)
                        {
                            var lastStatu = lastStatus[0];
                            var lastDate = lastStatu.BeginDateTime;
                            if (lastDate > end)
                            {
                                continue;
                            }
                            var lastEndDate = RandomDate(rand, lastDate, end);
                            lastStatu.EndDateTime = lastEndDate;
                            await context.PersonMemberStatus.AddAsync(new PersonMemberStatus()
                            {
                                BeginDateTime = lastEndDate,
                                MemberStatusId = memberStatu.Id,
                                EndDateTime = null,
                                PersonId = person.Id,
                            });
                        }
                        else
                        {
                            var lastEndDate = RandomDate(rand, start, end);
                            await context.PersonMemberStatus.AddAsync(new PersonMemberStatus()
                            {
                                BeginDateTime = lastEndDate,
                                MemberStatusId = memberStatu.Id,
                                EndDateTime = null,
                                PersonId = person.Id,
                            });
                        }
                    }
                }

                if (positions.Any())
                {
                    for (int i = 0; i < config.PersonPositions; i++)
                    {
                        var person = PickRandom(rand, persons);
                        if (person.PersonPositions.Any(p => p.EndDateTime == null) && rand.Next(2) == 0)
                        {
                            // remove a position
                            var persPos = PickRandom(rand, person.PersonPositions.Where(p => p.EndDateTime == null).ToList());
                            if (persPos.BeginDateTime > end)
                            {
                                continue; // failsafe
                            }
                            persPos.EndDateTime = RandomDate(rand, persPos.BeginDateTime, end);
                        }
                        else
                        {
                            // add a position
                            var pos = PickRandom(rand, positions);
                            await context.PersonPositions.AddAsync(new PersonPosition()
                            {
                                BeginDateTime = RandomDate(rand, start, end),
                                EndDateTime = null,
                                PersonId = person.Id,
                                PositionId = pos.Id,
                            });
                        }
                    }
                }

                if (persons.Any())
                {
                    EventTag eventTag = new EventTag()
                    {
                        Tag = "VT",
                    };
                    DateTime startTime = new DateTime(2022, 4, 16);
                    startTime = startTime.AddHours(20);
                    DateTime endTime = startTime.AddHours(21);

                    for (int i = 0; i < 4; i++)
                    {
                        var evnt = new Event()
                        {
                            Name = "Vereinstreffen " + i,
                            Start = startTime.AddDays(i),
                            End = endTime.AddDays(i),
                            Organizer = PickRandom(rand, persons),
                            SecretKey = "IchBinEinSecretKey" + i,
                        };
                        await context.Events.AddAsync(evnt);
                        await context.EventTags.AddAsync(new EventTag {
                            Tag = "VT",
                            Event = evnt,
                        });

                    }

                    await context.SaveChangesAsync();
                    var events = await context.Events.ToListAsync();

                    if (events.Any())
                    {
                        
                        foreach (var item in events)
                        {
                            Person person = PickRandom(rand, persons);
                            await context.EventAnswers.AddAsync(new EventAnswer()
                            {
                                PersonId = person.Id,
                                Time = item.Start.AddMinutes(1),
                                AnswerKind = EventAnswerKind.Accept,
                                EventId = item.Id
                            });
                        }
                    }

                    await context.Events.AddAsync(new Event()
                    {
                        Name = "Vereinstreffen leer",
                        Start = startTime.AddDays(10),
                        End = endTime.AddDays(10),
                        Organizer = PickRandom(rand, persons),
                        SecretKey = "IchBinEinSecretKeyLeer"
                    });

                }
            }
            await context.SaveChangesAsync();
        }

        public static async Task SeedDefaultMemberDataAsync(ApplicationDbContext context)
        {
            if (!await context.CareerLevels.AnyAsync())
            {
                await context.CareerLevels.AddAsync(new CareerLevel()
                {
                    IsActive = true,
                    Name = "Trainee",
                    ShortName = "T"
                });
                await context.CareerLevels.AddAsync(new CareerLevel()
                {
                    IsActive = true,
                    Name = "Associate",
                    ShortName = "A"
                });
                await context.CareerLevels.AddAsync(new CareerLevel()
                {
                    IsActive = true,
                    Name = "Junior Consultant",
                    ShortName = "J"
                });
                await context.CareerLevels.AddAsync(new CareerLevel()
                {
                    IsActive = true,
                    Name = "Consultant",
                    ShortName = "C"
                });
                await context.CareerLevels.AddAsync(new CareerLevel()
                {
                    IsActive = true,
                    Name = "Senior Consultant",
                    ShortName = "S"
                });
                await context.CareerLevels.AddAsync(new CareerLevel()
                {
                    IsActive = true,
                    Name = "Partner",
                    ShortName = "P"
                });
            }

            if (!await context.Positions.AnyAsync())
            {
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "1. Vorsitzende/r",
                    ShortName = "1V",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "2. Vorsitzende/r",
                    ShortName = "2V",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Vorstand Unternehmenskontakte",
                    ShortName = "V-UK",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Vorstand Personal",
                    ShortName = "V-P",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Vorstand Finanzen & Recht",
                    ShortName = "V-F&R",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Vorstand Qualität & Organisation",
                    ShortName = "V-Q&O",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Netzwerkbeauftragte/r",
                    ShortName = "NB",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Projektcontroller",
                    ShortName = "PC",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Schulungsbeauftragte/r",
                    ShortName = "SB",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Social-Media-Beauftragte/r",
                    ShortName = "SMB",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Ressortleitung Alkohol",
                    ShortName = "RL-C2H5OH",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Ressortleitung Vertrieb",
                    ShortName = "RL-V",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Ressortleitung Human Resources",
                    ShortName = "RL-HR",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Ressortleitung Finanzen & Recht",
                    ShortName = "RL-F&R",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Ressortleitung Qualitätsmanagement",
                    ShortName = "RL-QM",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Ressortleitung Marketing & Public Relations",
                    ShortName = "RL-M/PR",
                });
                await context.Positions.AddAsync(new Position()
                {
                    IsActive = true,
                    Name = "Ressortleitung Information Technologies",
                    ShortName = "RL-IT",
                });
            }

            if (!await context.MemberStatus.AnyAsync())
            {
                await context.MemberStatus.AddAsync(new MemberStatus()
                {
                    Name = "Anwärter/in",
                });
                await context.MemberStatus.AddAsync(new MemberStatus()
                {
                    Name = "Aktives Mitglied",
                });
                await context.MemberStatus.AddAsync(new MemberStatus()
                {
                    Name = "Passives Mitglied",
                });
                await context.MemberStatus.AddAsync(new MemberStatus()
                {
                    Name = "Ehemalige/r",
                });
            }
            await context.SaveChangesAsync();
        }

        private static string RandomSentence(Random random, int minlength, int maxlength)
        {
            int length = random.Next(minlength, maxlength);
            string result = "";
            for (int i = 0; i < length; i++)
            {
                result += RandomWord(random) + " ";
            }
            return result;
        }

        private static string RandomWord(Random random)
        {
            return WORDS[random.Next(WORDS.Length)];
        }

        private static DateTime RandomDate(Random random, DateTime start, DateTime end)
        {
            int range = (end - start).Days;
            return start.AddDays(random.Next(range));
        }

        private static string RandomChars(Random random, int minlength, int maxlength)
        {
            string result = "";
            int length = random.Next(minlength, maxlength);
            for (int i = 0; i < length; i++)
            {
                result += (char)random.Next('a', 'z' + 1);
            }
            return result;
        }

        private static Gender RandomGender(Random random)
        {
            return ALL_GENDER[random.Next(ALL_GENDER.Length)];
        }

        private static T PickRandom<T>(Random random, List<T> list)
        {
            return list[random.Next(list.Count)];
        }
    }
}
